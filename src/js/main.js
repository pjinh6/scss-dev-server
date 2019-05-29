export const log = msg => console.log(msg);

function* gen () {
	yield 1;
	// yield 2;
	yield 3;
}

const iter = gen();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());