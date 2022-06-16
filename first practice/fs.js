const fs = require('fs');

fs.readFile('./hello.txt', (err, data) => {
	if (err){
		console.log('theres an error', err);
	}

	console.log('1', data.toString());

	//toString encodes the recieved data which originally is sent as a 'buffer'
	//this method uses the utf8 encoding by default if a different one isnt specified
	//utf represents every character we read z.b w, ü etc in numbers and is able to convert interchangeably
	// another is ASCII which mainly contains only the latin characters but utf extended this to include more from other languages
})

const file = fs.readFileSync('./hello.txt');
console.log('2', file.toString());

// readFile is asycnronous. it uses a callback function which says run the result after reading /parsing the file and clearing the callstack (single-threaded)
// readFileSync reads / parses the file and returns the specified result directly afterward or synchronously

//More commands:
//fs.appendFile
//fs.write
//fs.unlink