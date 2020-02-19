CKEDITOR.addTemplates('default', {
  imagesPath: CKEDITOR.getUrl('/templates/images/firststeps/'),
  templates: [
    {
      title: 'Look Back',
      image: 'LookBack.png',
      description: 'Image and Title',
      html:
        '\x3cdiv class\x3e"lesson"\x3e\x3cimg class\x3e"lesson-icon" src\x3e"/images/firststeps/look-back.png" /\x3e\x3cdiv class\x3e"lesson-lookback"\x3eLook Back\x3c/div\x3e\x3c/div\x3e'
    },
    {
      title: 'Look Up',
      image: 'LookUp.png',
      description: 'Image and Title',
      html:
        '\x3cdiv class\x3e"lesson"\x3e\x3cimg class\x3e"lesson-icon" src\x3e"/images/firststeps/look-up.png" /\x3e\x3cdiv class\x3e"lesson-lookup"\x3eLook Up\x3c/div\x3e\x3c/div\x3e'
    },
    {
      title: 'Look Forward',
      image: 'LookForward.png',
      description: 'Image and Title',
      html:
        '\x3cdiv class\x3e"lesson"\x3e\x3cimg class\x3e"lesson-icon" src\x3e"/images/firststeps/look-forward.png" /\x3e\x3cdiv class\x3e"lesson-lookforward"\x3eLook Forward\x3c/div\x3e\x3c/div\x3e'
    },
    {
      title: 'BiblePassage',
      image: '',
      description: 'Bible Passage and Link',
      html:'\x3cdiv id\x3d"bible"\x3e\x3cdiv class\x3d"bible"\x3e|PassageName|\x3cbr\x3e|Bible Text|\x3cbr /\x3e\x3ca class\x3d"readmore" href\x3d"|Reference|"\x3eRead More \x3c/a\x3e\x3c/div\x3e\x3c/div\x3e'
    }
  ]
})
