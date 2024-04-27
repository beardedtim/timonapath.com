const MainLayout = ({
  meta,
  styles,
  headLinks,
  body,
  footLinks,
}: {
  meta: {
    title: string
  }
  styles: string[]
  headLinks: any[]
  footLinks: any[]
  body: string
}) =>
  `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.title}</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
    <link rel="manifest" href="/assets/images/site.webmanifest">
    ${styles.map((href) => `<link rel="stylesheet" href="${href}" />`).join('\n')}
    ${headLinks
      .map(
        ({ src, crossorigin }) =>
          `<script src="${src}" ${
            crossorigin ? `crossorigin="${crossorigin}"` : ''
          }></script>`,
      )
      .join('\n')}
</head>
<body class="has-navbar-fixed-top">
    ${body}
</body>
</html>
    ${footLinks
      .map(
        ({ src, crossorigin }) =>
          `<script src="${src}" ${
            crossorigin ? `crossorigin="${crossorigin}"` : ''
          }></script>`,
      )
      .join('\n')}
      `.trim()

export default MainLayout