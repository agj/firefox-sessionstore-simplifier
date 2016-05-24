
import R from 'ramda'
import fs from 'fs-promise'
import dotInto from 'dot-into'
import glob from 'glob-promise'

dotInto.install();

const all = Promise.all.bind(Promise);
const allObj = ps =>
	all(R.values(ps))
	.then(R.zipObj(R.keys(ps)));

const simplify = o => ({ url: o.url, title: o.title });

glob('input/*')
.then(R.reduce((acc, file) => { acc[file] = file; return acc }, {}))
.then(R.map(file => fs.readFile(file, { encoding: 'utf8' })))
.then(allObj)
.then(R.map(JSON.parse))
.then(R.map(data =>
	data.windows
	.into(R.map(R.prop('tabs')))
	.into(R.flatten)
))
.then(R.map(R.map(R.prop('entries'))))
.then(R.map(R.map(R.last)))
.then(R.map(R.map(simplify)))
.then(R.map(data => JSON.stringify(data, null, '\t')))
.then(jsons =>
	R.keys(jsons)
	.forEach(f => fs.writeFile('output/' + R.replace(/input\/(.+)/g, '$1', f), jsons[f], { encoding: 'utf8' }))
)
.catch(console.error)

