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
        console.log("Error reading file:", err);
        return;
    }

    let parsedData;
    try {
        parsedData = JSON.parse(data);
        console.log("Parsed data structure:", JSON.stringify(parsedData, null, 2));
    } catch (e) {
        console.log("Error parsing JSON:", e);
        return;
    }

    const filteredData = parsedData.filter(item =>
        item.txt === 'Доходи, усього' || item.txt === 'Витрати, усього'
    );
    console.log("Filtered data:", filteredData);

    const finalData = filteredData
        .map(item => `${item.txt}:${item.value}`)
        .join('\n');

    console.log("Final formatted data:", finalData);

    if (options.output) {
        fs.writeFile(options.output, finalData, 'utf-8', (err) => {
            if (err) {
                console.log("Error writing to file:", err);
                return;
            }
            console.log(`Data successfully written to ${options.output}`);
        });
    }
    if (options.display) {
        console.log("Displaying data:\n", finalData);
    }
});
