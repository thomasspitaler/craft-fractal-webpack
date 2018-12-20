const path = require('path');
const glob = require('glob');
const fs = require('fs');
var shell = require('shelljs');

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

const argv = process.argv;

if (argv.length !== 4) {
    console.log('usage: create-components-map <src-dir> <map-file-name.json>');
    process.exit(2);
    return;
}

const filesSrcDir = path.resolve(argv[2]);
const mapFile = path.resolve(argv[3]);
const filesPattern = path.join('**/*.twig');

const options = {
    cwd:filesSrcDir
};
glob(filesPattern, options, processFiles);

/* callback for glob function, processes files */
function processFiles(err, files) {
    if (err) {
        console.log(err);
        process.exit(2);
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
    const dir = path.dirname(filePath);
    shell.mkdir('-p', dir);
    fs.writeFileSync(filePath, JSON.stringify(map, null, 2) , 'utf-8');
}
