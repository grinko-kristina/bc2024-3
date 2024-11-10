const { program } = require('commander');
const fs = require('node:fs');

program
    .option('-i, --input <path>')
    .option('-o, --output <path>')
    .option('-d, --display');

program.parse();

const options = program.opts();

if (!options.input) {
    console.log('Please, specify input file');
    return;
}
if (!fs.existsSync(options.input)) {
    console.log('Cannot find input file');
    return;
}

fs.readFile(options.input, 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    if(options.output){
        fs.writeFile(options.output, data, 'utf-8', (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    if(options.display){
        console.log(data);
    }
});