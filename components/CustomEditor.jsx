import { Editor } from '@tinymce/tinymce-react'
import React, { useRef } from 'react'

export function CustomEditor(props) {
  const editorRef = useRef(null)
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }
  const images_upload_handler = async (blobInfo, success, failure,progress) => {
    let imageFile = new FormData()
    imageFile.append('files[]', blobInfo.blob())

    try {
      const { data } = await axios.post(
        'http://urlToHandleFileUpload',
        imageFile,
      )
      success(data.fileURL)
    } catch (error) {
      handleResponseError(error)
      return
    }
  }
  return (
    <Editor
      tinymceScriptSrc={'/tinymce/tinymce.min.js'}
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={props.content}
      init={{
        height: 500,
        max_height: 800,
        menubar: true,
        statusbar: true,
        browser_spellcheck: true,
        object_resizing: 'img',
        resize_img_proportional:true,
        fontsize_formats:
    "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
    line_height_formats: '1 1.2 1.4 1.6 2',
    text_patterns: [
      { start: '*', end: '*', format: 'italic' },
      { start: '**', end: '**', format: 'bold' },
      { start: '#', format: 'h1' },
      { start: '##', format: 'h2' },
      { start: '###', format: 'h3' },
      { start: '####', format: 'h4' },
      { start: '#####', format: 'h5' },
      { start: '######', format: 'h6' },
      { start: '* ', cmd: 'InsertUnorderedList' },
      { start: '- ', cmd: 'InsertUnorderedList' },
      { start: '1. ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'decimal' } },
      { start: '1) ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'decimal' } },
      { start: 'a. ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'lower-alpha' } },
      { start: 'a) ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'lower-alpha' } },
      { start: 'i. ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'lower-roman' } },
      { start: 'i) ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'lower-roman' } }
    ],
        images_upload_handler: images_upload_handler,

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
          'code',
          'help',
          'wordcount',
          'emoticons',
          'nonbreaking',
          'removeformat',
        ],
        toolbar:
          'paste undo redo blocks fontsize lineheight searchreplace' +
          'image media insertdatetime link nonbreaking' +
          'bold italic forecolor backcolor alignleft aligncenter ' +
          'alignright alignjustify bullist numlist outdent indent ' +
          'charmap code emoticons' +
          'removeformat help fullscreen preview',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
      onEditorChange={props.handleOnEditorChange}
    />
  )
}
