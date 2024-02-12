export function stripHtmlTags(htmlString: string) {
    return htmlString.replace(/<[^>]*>?/gm, '');
  }
  