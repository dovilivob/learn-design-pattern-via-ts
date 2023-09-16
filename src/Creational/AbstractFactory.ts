// Abstract --> Abs
// Concrete --> Con
// Factory  --> Fact
// Product  --> Prod
// Function --> Func
// Collaborator --> Coll

interface Fact {
	create_prod_A(): ProdA;
	create_prod_B(): ProdB;
}

interface ProdA {
	func(): string;
}
interface ProdB {
	func(): string;
	another_func(coll: ProdA): string;
}

class Fact1 implements Fact {
	public create_prod_A(): ProdA {
		return new ProdA1();
	}
	public create_prod_B(): ProdB {
		return new ProdB1();
	}
}

class Fact2 implements Fact {
	public create_prod_A(): ProdA {
		return new ProdA2();
	}

	public create_prod_B(): ProdB {
		return new ProdB2();
	}
}

class ProdA1 implements ProdA {
	public func(): string {
		return 'the result of A1';
	}
}

class ProdA2 implements ProdA {
	public func(): string {
		return 'the result of A2';
	}
}

class ProdB1 implements ProdB {
	public func(): string {
		return 'the result of B1';
	}
	public another_func(coll: ProdA): string {
		const result = coll.func();
		return `the result of B1 work with (${result})`;
	}
}

class ProdB2 implements ProdB {
	public func(): string {
		return 'the result of B2';
	}
	public another_func(coll: ProdA): string {
		const result = coll.func();
		return `the result of B2 work with (${result})`;
	}
}

// @ts-ignore
function main(fact: Fact) {
	const pA = fact.create_prod_A();
	const pB = fact.create_prod_B();

	console.log(pB.func());
	console.log(pB.another_func(pA));
}

console.log();
main(new Fact1());
console.log();
main(new Fact2());
console.log();
