/**
 * Test the experimental tag management classes
 */
import { TagObj, TagObjCol, } from '../index.js';
///////   Testing the classes
console.log('\n\n\n\n');
function tst1() {
    let tx1 = { tdata: { a: 3, b: 4 }, tags: ['some', 'tags'] };
    let tagObj = new TagObj({ s: 5, r: 7 }, ['a', 'bright', 'day']);
    let tagObj2 = new TagObj({ tdata: { s: 5, r: 7 }, tags: ['a', 'bright', 'day'] });
    console.log('in TST1:', { tagObj2 });
}
function tst2() {
    console.log(`\n\n\nStart Tst2\n`);
    let tx1 = { tdata: { a: 3, b: 4 }, tags: ['some', 'tags'] };
    let tagObj = new TagObj({ s: 5, r: 7 }, ['a', 'bright', 'day']);
    let tagObj2 = new TagObj({ tdata: { s: 5, r: 7 }, tags: ['a', 'bright', 'day'] });
    let tagObj3 = new TagObj({ why: 'not', r: 7 }, ['less', 'bright', 'day']);
    let tagObjCol = new TagObjCol([tagObj3, tagObj2, { tdata: { no: 'joy', always: "happiness" }, tags: ['a', 'set', 'of', 'tags'] }]);
    let fetched = tagObjCol.fetchAny('set');
    //console.log('in TST2:', { tagObj2 });
    console.log('in TST3:', { tagObj3, tagObjCol, fetched });
}
tst2();
//# sourceMappingURL=tstTags.js.map