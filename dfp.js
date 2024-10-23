const fs = require('fs');


function parseFile (indata, outdata, delimiter = ";") {
  if (fs.existsSync(outdata)) {
    fs.unlinkSync(outdata);
  }
  try {
    const data = fs.readFileSync(indata, "utf-8")
    let review 
    let sentiment
    let count = 0
    const lines = data.split(/\n/)
    delimiter = lines[0].at(6)
    for (let i = 1; i < lines.length; i++) {
      count++
      lineArr = lines[i].split(delimiter)
      review = lineArr[0].trim().substring(0,20)
      sentiment = lineArr[1].trim()
      fs.appendFileSync(outdata, `${sentiment}${delimiter}${review}\n`, "utf-8")
    }
    return count
  } catch (error) {
    return -1
  }
}



  parseFile("datafile.csv", "outputdata.csv")



// Leave this code here for the automated tests
module.exports = {
  parseFile,
}