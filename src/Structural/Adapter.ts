class Target {
	public req(): object {
		return { message: 'Default message' };
	}
}

class Adaptee {
	public specific_req(): string {
		return '{"message": "hello world"}';
	}
}

class Adapter extends Target {
	private adaptee: Adaptee;

	constructor(adaptee: Adaptee) {
		super();
		this.adaptee = adaptee;
	}

	public req(): object {
		const result = this.adaptee.specific_req();
		return JSON.parse(result);
	}
}

function main(target: Target) {
	console.log(target.req());
}

console.log('\nI can work just fine without the Target objects:');
const target = new Target();
main(target);

console.log('\nThe Adaptee result is a string.');
const adaptee = new Adaptee();
console.log(adaptee.specific_req());

console.log("\nLet's transfer it to an object!");
const adapter = new Adapter(adaptee);
main(adapter);
