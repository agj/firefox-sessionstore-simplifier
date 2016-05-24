
import R from 'ramda'
import fs from 'fs-promise'
import dotInto from 'dot-into'

dotInto.install();

const all = Promise.all.bind(Promise);

const simplify = o => ({ url: o.url, title: o.title });

['input/current.json',
 'input/old.json']
.map(file => fs.readFile(file, { encoding: 'utf8' }))
.into(all)
.then(R.map(JSON.parse))
.then(R.map(data =>
	data.windows
	.into(R.map(R.prop('tabs')))
	.into(R.flatten)
))
.then(R.map(R.map(R.prop('entries'))))
.then(R.tap(console.log))
.then(R.map(R.map(R.last)))
.then(R.map(R.map(simplify)))
.then(R.map(data => JSON.stringify(data, null, '\t')))
.then(([current, old]) => {
	fs.writeFile('output/current.json', current, { encoding: 'utf8' });
	fs.writeFile('output/old.json', old, { encoding: 'utf8' });
})
.catch(console.error)

