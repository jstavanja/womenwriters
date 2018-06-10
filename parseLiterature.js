const axios = require('axios')

const createOrAdd = (obj, doc) => {
  if (!obj[doc.date_i]) {
    obj[doc.date_i] = []
  }
  obj[doc.date_i].push({
    creators: doc.document_authorName_ss.map((author) => author.split(',')[0]),
    name: doc.document_displayName_s.replace('*', ''),
    numOfWriters: doc.document_authorName_ss.length
  })
}

let final = {}

axios.post('https://repository.huygens.knaw.nl/solr/wwdocumentreceptions/select', 'q=*:*&fq=date_i%3A%5B1800%20TO%201900%5D&fq=type_s%3Adocument_reception&fq=%7B!parent%20which%3Dtype_s%3Adocument_reception%7Dperson_gender_s%3A(%22FEMALE%22)&fq=publishLocation_ss%3A(%22Norway%22)&facet.field=document_authorName_ss&facet.field=publishLocation_ss&rows=27437&facet.limit=-1&facet.sort=count&&start=0&facet=on&wt=json')
  .then(res => res.data.response.docs)
  .then((docs) => {
    docs.forEach((doc) => {
      createOrAdd(final, doc)
    })
  }).then(() => {
    console.log(JSON.stringify(final, null, 2))
  })
  
