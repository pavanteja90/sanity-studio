const Preview = ({slug}: {slug: string | undefined}) => {
  console.log(slug)
  const source = 'http://localhost:3000/ratings'
  return <iframe title="preview" src={source} height={'100%'} width={'99%'}></iframe>
}

export default Preview
