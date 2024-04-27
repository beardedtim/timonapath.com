const configureEditor = () => {
  const handleFileUpload = (blobInfo, progress) =>
    new Promise((res) => {
      console.log(blobInfo, progress)
      progress(1)
      progress(12)
      progress(88)
      progress(99)

      res('https://placehold.co/600x400')
    })

  tinymce.init({
    selector: '#editor',
    min_height: 750,
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'help',
      'wordcount',
    ],
    toolbar:
      'undo redo | blocks | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    images_upload_handler: handleFileUpload,
  })
}

const configureFormSubmitHandler = () => {
  const createForm = document.getElementById('create-form')
  const editForm = document.getElementById('edit-form')

  editForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const title = formData.get('title')
    const description = formData.get('description')
    const published = formData.get('published') === 'on'
    const body = tinymce.get('editor').getContent()

    const dto = {
      title,
      description,
      body,
      published,
    }

    const data = await fetch(`/api/thoughts/${editForm.dataset.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    })
      .then((x) => x.json())
      .then(({ data, error }) => {
        if (error) {
          throw error
        }

        return data
      })

    window.location.href = `/thoughts/${data._id}`
  })

  createForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const title = formData.get('title')
    const description = formData.get('description')
    const published = formData.get('published') === 'on'
    const body = tinymce.get('editor').getContent()

    const dto = {
      title,
      description,
      body,
      published,
    }

    const data = await fetch('/api/thoughts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    })
      .then((x) => x.json())
      .then(({ data, error }) => {
        if (error) {
          throw error
        }

        return data
      })

    window.location.href = `/thoughts/${data._id}`
  })
}

window.addEventListener('load', () => {
  configureEditor()
  configureFormSubmitHandler()
})
