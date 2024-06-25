import { execSync } from 'child_process';
import * as fs from 'fs';
import { globSync } from 'glob';
import { MinifyOptions, minify } from 'uglify-js';

// buildフォルダを作成
if (!fs.existsSync('build')) {
    fs.mkdirSync('build');
} else {
    fs.rmSync('build', { recursive: true });
    fs.mkdirSync('build');
}

execSync('tsc --diagnostics'); // TypeScriptをコンパイル

// srcフォルダ内のファイルを./behavior_packs/**/scripts 以外をbuildフォルダにコピー
const files = globSync(['./behavior_packs/**/*', './resource_packs/**/*'], { ignore: ['./behavior_packs/**/scripts/**/*', './behavior_packs/**/scripts/'] }).map((file) => file.replace(/\\/g, '/'));

//console.debug(files); // debug

// 正規表現でbehavior_packsとresource_packsを分ける
const regex_bp = /^behavior_packs/;
const regex_rp = /^resource_packs/;

// ファイルを分ける
const BP = files.filter((file) => regex_bp.test(file));
const RP = files.filter((file) => regex_rp.test(file));

// console.debug(BP); // debug

// console.debug(RP); // debug

BP.forEach((file) => {
    const output = file.replace('behavior_packs', 'build/behavior_packs');

    if (!fs.existsSync(output) && fs.lstatSync(file).isDirectory()) {
        fs.mkdirSync(output, { recursive: true });
    } else if (fs.existsSync(output) && fs.lstatSync(file).isDirectory()) {
        return;
    } else {
        fs.copyFileSync(file, output);
    }
});

RP.forEach((file) => {
    const output = file.replace('resource_packs', 'build/resource_packs');

    if (!fs.existsSync(output) && fs.lstatSync(file).isDirectory()) {
        fs.mkdirSync(output, { recursive: true });
    } else if (fs.existsSync(output) && fs.lstatSync(file).isDirectory()) {
        return;
    } else {
        fs.copyFileSync(file, output);
    }
});

const scripts = globSync('./build/behavior_packs/**/scripts/**/*', { nodir: true }).map((file) => file.replace(/\\/g, '/'));

/**圧縮オプション*/
const minifyOption: MinifyOptions = {
    mangle: {
        toplevel: true,
    },
    nameCache: {},
};

scripts.forEach((file) => {
    // JavaScriptファイルの場合、圧縮処理を実行して新しいファイルに保存
    const jsContent = fs.readFileSync(file, 'utf8');
    const minifiedContent = minify(jsContent, minifyOption).code;

    fs.writeFileSync(file, minifiedContent);
    console.log('minify: ' + file);
});
