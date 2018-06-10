const allDocuments = require('./allDocuments.json') // ignored in git because of filesize (query = all the document receptions)
const docs = allDocuments.response.docs

const allAuthors = ["Jane Austen", "George Eliot", "Charlotte Brontë", "Charlotte Bronte", "Mary Wollstonecraft", "Harriet Beecher Stowe", "Harriet Elisabeth Beecher Stowe", "M. L. Alcott", "Louisa May Alcott"]

const authorsCountriesDict = {}

const createOrAdd = (obj, author, country) => {
  let rightCountry = country
  if (country.includes('CZE')) {
    rightCountry = 'Czech Republic'
  }

  if (country.includes('NLD')) {
    rightCountry = 'Netherlands'
  }

  if (country.includes('FIN')) {
    rightCountry = 'Finland'
  }

  if (!obj[author]) {
    obj[author] = {}
  }
  if (!obj[author][rightCountry]) {
    obj[author][rightCountry] = 0
  }
  obj[author][rightCountry]++
}

const sortObject = (obj) => {
  let arr = []
  for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
          arr.push({
              'country': prop,
              'receptions': obj[prop]
          });
      }
  }
  arr.sort((a, b) => b.receptions - a.receptions)
  return arr
}

docs.forEach((doc) => {
  if (doc.publishLocation_ss && doc.document_authorName_ss) {
    doc.document_authorName_ss.forEach((documentAuthor) => {
      if (allAuthors.indexOf(documentAuthor) > 0) {
        doc.publishLocation_ss.forEach((country) => {
          createOrAdd(authorsCountriesDict, documentAuthor, country)
        })
      }
    })
  }
})

let sortedObj = {}

Object.keys(authorsCountriesDict).forEach((author) => {
  sortedObj[author] = sortObject(authorsCountriesDict[author])
})

console.log(JSON.stringify(sortedObj, null, 2))
