const LinkedList = () => {
	let head = null;
	let _size = 0;

	const _NodeFactory = (value = null, next = null) => {
		return {
			value,
			next,
		};
	};

	const append = (value) => {
		const temp = _NodeFactory(value);
		if (!head) {
			head = temp;
		} else {
			let node = head;
			while (node.next) {
				node = node.next;
			}
			node.next = temp;
		}
		_size++;
	};

	const prepend = (value) => {
		const temp = _NodeFactory(value);
		if (!head) {
			head = temp;
		} else {
			temp.next = head;
			head = temp;
		}
		_size++;
	};

	const tail = () => {
		let node = head;
		while (node.next) {
			node = node.next;
		}
		return node.value;
	};

	const at = (index) => {
		if (index < _size) {
			let node = head;
			for (let i = 0; i < index; i++) {
				node = node.next;
			}
			return node.value;
		} else {
			throw new Error(`List has fewer than ${index} items.`);
		}
	};

	const pop = () => {
		let node = head;
		while (node.next.next) {
			node = node.next;
		}
		node.next = null;
		_size--;
	};

	const contains = (target) => {
		let node = head;
		while (node) {
			if (node.value === target) {
				return true;
			} else {
				node = node.next;
			}
			return false;
		}
	};

	const find = (target) => {
		let node = head;
		let i = 0;
		while (node) {
			if (node.value === target) {
				return i;
			} else {
				node = node.next;
				i++;
			}
		}
		return null;
	};

	const listToString = () => {
		let node = head;
		let str = '';
		while (node) {
			str += `( ${node.value} ) -> \n`;
			node = node.next;
		}
		str += '  null';
		console.log(str);
	};

	const insertAt = (value, index) => {
		const temp = _NodeFactory(value);
		if (index < _size) {
			let before = head;
			for (let i = 0; i < index - 1; i++) {
				before = before.next;
			}
			const after = before.next;
			temp.next = after;
			before.next = temp;

			_size++;
		} else {
			throw new Error(`List has fewer than ${index} items.`);
		}
	};

	const removeAt = (index) => {
		if (index < _size) {
			let before = head;
			for (let i = 0; i < index - 1; i++) {
				before = before.next;
			}
			const target = before.next;
			const after = target.next;
			before.next = after;
			target.next = null;
			_size--;
		} else {
			throw new Error(`List has fewer than ${index} items.`);
		}
	};

	return {
		append,
		prepend,
		size: () => _size,
		head,
		tail,
		at,
		pop,
		contains,
		find,
		listToString,
		insertAt,
		removeAt,
	};
};

let list = LinkedList();

list.append('post 1');
list.append('post 2');
list.prepend('pre 1');
list.append('post 3');
list.append('post 4');
list.append('post 5');

console.log('\nLength: ' + list.size());

list.listToString();

console.log('Tail value: ' + list.tail());

let testIndex = 3;
console.log(`Node at index ${testIndex}: ${list.at(testIndex)}`);

list.pop();
console.log('\nLength: ' + list.size());
list.listToString();

let contains1 = 'pre 1';
let contains2 = 'pre 2';
console.log(`List has value "${contains1}": ${list.contains(contains1)}`);
console.log(`List has value "${contains2}": ${list.contains(contains2)}`);

let find1 = 'post 2';
let find2 = 'pre 2';
console.log(`Index of value "${find1}": ${list.find(find1)}`);
console.log(`Index of value "${find2}": ${list.find(find2)}`);

list.removeAt(3);
console.log('\nLength: ' + list.size());
list.listToString();

list.insertAt('insert test', 3);
console.log('\nLength: ' + list.size());
list.listToString();
