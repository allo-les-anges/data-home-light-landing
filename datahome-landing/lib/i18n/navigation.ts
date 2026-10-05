export const primaryPages = ['home','product','templates','pricing','partners','resellers','contact'] as const;
export const pendingPages = ['product','templates','faq'] as const;
export function pagePath(locale:string,page:string) { return '/' + locale + (page === 'home' ? '' : '/' + page); }
