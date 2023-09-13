// Abstract --> Abs
// Concrete --> Con
// Factory  --> Fact
// Product  --> Prod
// Function --> Func
// Collaborator --> Coll

interface AbsFact {
	create_prod_A(): AbsProdA;
	create_prod_B(): AbsProdB;
}

interface AbsProdA {
	func(): string;
}
interface AbsProdB {
	func(): string;
	another_func(coll: AbsProdA): string;
}

class ConFact1 implements AbsFact {
	public create_prod_A(): AbsProdA {
		return new ConProdA1();
	}
	public create_prod_B(): AbsProdB {
		return new ConProdB1();
	}
}
class ConFact2 implements AbsFact {
	public create_prod_A(): AbsProdA {
		return new ConProdA2();
	}
	public create_prod_B(): AbsProdB {
		return new ConProdB2();
	}
}

class ConProdA1 implements AbsProdA {
	public func() {
		return 'the result of A1';
	}
}

class ConProdA2 implements AbsProdA {
	public func() {
		return 'the result of A2';
	}
}

class ConProdB1 implements AbsProdB {
	public func() {
		return 'the result of B1';
	}

	public another_func(coll: AbsProdA): string {
		const result = coll.func();
		return `the result of B1 work with (${result})`;
	}
}
class ConProdB2 implements AbsProdB {
	public func() {
		return 'the result of B2';
	}

	public another_func(coll: AbsProdA): string {
		const result = coll.func();
		return `the result of B2 work with (${result})`;
	}
}

function client_code(fact: AbsFact) {
	const p_A = fact.create_prod_A();
	const p_B = fact.create_prod_B();

	console.log(p_B.func());
	console.log(p_B.another_func(p_A));
}

console.log();
console.log('F1 test');
client_code(new ConFact1());
console.log();
console.log('F2 test');
client_code(new ConFact2());
console.log();
