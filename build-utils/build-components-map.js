const path = require('path');
const glob = require('glob');
const fs = require('fs');

/*
 * Creates a component map as required by the Craft cms plugin
 * ournameismud/fractal which enables the use of Fractal components
 * in Craft cms.
 *
 * Example output:
 *
 *  {
 *      "@blockquote": "components/blockquote.twig",
 *  }
 */

const filesSrcDir = path.join(__dirname, '../src');
const filesPattern = path.join('**/*.twig');
const mapFile = path.join(__dirname, '../components-map.json');

const options = {
    cwd:filesSrcDir
};
glob(filesPattern, options, processFiles);

/* callback for glob function, processes files */
function processFiles(err, files) {
    if (err) {
        console.log(err);
        process.exit(1);
        return;
    }

    const map = buildMap(files);
    writeMapFile(map, mapFile);
}

/* builds a components map given an array of files */
function buildMap(files) {
    const map = {};

    files.forEach(function(file) {
        const templateName = path.basename(file, '.twig');

        if (templateName.startsWith('_')) return;

        const key = '@' + templateName;
        map[key] = file;
    });

    return map;
}

/* writes the map to filePath */
function writeMapFile(map, filePath) {
    fs.writeFileSync(filePath, JSON.stringify(map, null, 2) , 'utf-8');
}
