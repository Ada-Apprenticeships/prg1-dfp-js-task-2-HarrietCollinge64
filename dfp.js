const fs = require('fs');


function parseFile (indata, outdata, delimiter = ";") {

  //removed output file if already exists
  fs.existsSync(outdata) ? fs.unlinkSync(outdata) : false

  try {
    const data = fs.readFileSync(indata, "utf-8")
    let count = 0
    const lines = data.split(/\n/)

    //use the specified delimiter from the first line if not provided
    delimiter = delimiter || lines[0].at(6);

    for (let i = 1; i < lines.length; i++) {
      lineSplit = lines[i].split(delimiter)
      const review = lineSplit[0].trim().substring(0,20)
      const sentiment = lineSplit[1].trim()
      fs.appendFileSync(outdata, `${sentiment}${delimiter}${review}\n`, 'utf-8')
      count++
    }
    return count
  } catch (error) {
    return -1
  }
}

// Leave this code here for the automated tests
module.exports = {
  parseFile,
}