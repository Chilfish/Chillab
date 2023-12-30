import type { Bookmark } from '~/types'
import { Toast } from '~/components'

/**
 * Parse bookmark content to json
 * @param content the raw bookmark content
 * @returns the json array bookmarks
 */
export function parseBookmark(content: string): Bookmark[] {
  try {
    return _parseBookmark(content)
  }
  catch (e) {
    Toast({ message: 'Parse bookmark failed', type: 'error' })
    return []
  }
}

function _parseBookmark(content: string): Bookmark[] {
  if (!content.trim() || !document)
    return []

  const div = document.createElement('div')
  div.innerHTML = content

  const root = div.querySelector('dl')!.childNodes as NodeListOf<HTMLElement>

  // the folder name before inserted
  let lastName = ''

  // the folder element before inserted
  let lastFolder: HTMLElement

  // the root bookmark element
  let rootBook: HTMLElement

  // is root bookmark
  let isRoot = false

  // inserted folder name
  const inserted = new Set<string>()

  // the result bookmarks
  const bookmarks = [] as Bookmark[]

  // convert bookmark element to json
  function toJson(dts: HTMLElement) {
    const _bookmarks = dts.querySelectorAll<HTMLAnchorElement>('A')

    return [..._bookmarks].map((bookmark) => {
      return {
        title: bookmark.textContent || '',
        url: bookmark.href,
        icon: bookmark.attributes.getNamedItem('ICON')?.value,
      }
    })
  }

  // insert bookmark to result
  function insert(name = lastName, folder = lastFolder) {
    if (inserted.has(name))
      return
    inserted.add(name)
    bookmarks.push({
      folderName: name || 'Default',
      bookmarks: toJson(folder),
    })
  }

  // get root bookmark element, then wrapped by div
  function rootEl(el: HTMLElement) {
    const div = document.createElement('div')
    const children = [...el.parentElement!.children]

    const idx = children.findIndex(e => e === el)
    children.slice(idx).forEach(e => div.append(e.cloneNode(true)))

    return div
  }

  // parse bookmark
  function parser(dts: NodeListOf<HTMLElement>) {
    dts.forEach((folder) => {
      if (folder.tagName !== 'DT')
        return

      // folder name
      const name = folder.querySelector<HTMLHeadElement>('H3')

      if (name) {
        lastFolder = folder
        lastName = name.textContent || ''

        // it's a folder
        parser(folder.querySelectorAll('dt'))

        // During recursive backtracking
        // if it's root bookmark, then insert it
        if (isRoot) {
          insert(`${name.textContent || 'default'} - root`, rootEl(rootBook))
          isRoot = false
        }
      }

      // the first root bookmark, dont have folder name
      // its previous element is a folder that has name
      // also, it's not the root bookmark that has been inserted
      if (!name
        && rootBook !== folder
        && folder.previousElementSibling?.querySelector('h3')
      ) {
        isRoot = true
        rootBook = folder
      }
    })

    insert()
  }

  parser(root)

  return bookmarks
}
