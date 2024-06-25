import * as fs from 'fs';
import { globSync } from 'glob';
import Archiver from 'archiver';

// distフォルダを作成
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
} else {
    fs.rmSync('dist', { recursive: true });
    fs.mkdirSync('dist');
}

const files = globSync(['./build/behavior_packs/**/*', './build/resource_packs/**/*']).map((file) => file.replace(/\\/g, '/'));

const regex_bp = /^build\/behavior_packs/;
const regex_rp = /^build\/resource_packs/;

const BP = files.filter((file) => regex_bp.test(file));
const RP = files.filter((file) => regex_rp.test(file));

BP.forEach((path) => {
    const output = path.replace('build/behavior_packs', 'dist').split('/');

    const output_path = output
        .map((value, index) => {
            if (index === 1) return value + '_BP';
            else return value;
        })
        .join('/');

    if (!fs.existsSync(output_path) && fs.lstatSync(path).isDirectory()) {
        fs.mkdirSync(output_path, { recursive: true });
    } else if (fs.existsSync(output_path) && fs.lstatSync(path).isDirectory()) {
        return;
    } else {
        fs.copyFileSync(path, output_path);
    }
});

RP.forEach((path) => {
    const output = path.replace('build/resource_packs', 'dist').split('/');

    const output_path = output
        .map((value, index) => {
            if (index === 1) return value + '_RP';
            else return value;
        })
        .join('/');

    if (!fs.existsSync(output_path) && fs.lstatSync(path).isDirectory()) {
        fs.mkdirSync(output_path, { recursive: true });
    } else if (fs.existsSync(output_path) && fs.lstatSync(path).isDirectory()) {
        return;
    } else {
        fs.copyFileSync(path, output_path);
    }
});

fs.rmSync('build', { recursive: true });

const output = fs.createWriteStream('dist/ViewInventory.mcaddon');

const archiver = Archiver('zip', { zlib: { level: 9 } });

archiver.pipe(output);

fs.readdirSync('dist').forEach((dir) => {
    archiver.directory(`dist/${dir}`, dir);
});

await archiver.finalize();

output.on('close', () => {
    console.log(archiver.pointer() + ' total bytes');
});
