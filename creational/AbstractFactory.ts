// Abstract --> Abs
// Concrete --> Con
// Factory  --> Fact
// Product  --> Prod
// Function --> Func
// Collaborator --> Coll

interface IFact {
	create_Prod_A(): IProdA;
	create_Prod_B(): IProdB;
}

interface IProdA {
	func(): string;
}
interface IProdB {
	func(): string;
	another_func(coll: IProdA): string;
}

class Fact1 implements IFact {
	public create_Prod_A(): IProdA {
		return new ProdA1();
	}
	public create_Prod_B(): IProdB {
		return new ProdB1();
	}
}

class Fact2 implements IFact {
	public create_Prod_A(): IProdA {
		return new ProdA2();
	}

	public create_Prod_B(): IProdB {
		return new ProdB2();
	}
}

class ProdA1 implements IProdA {
	public func(): string {
		return 'the result of A1';
	}
}

class ProdA2 implements IProdA {
	public func(): string {
		return 'the result of A2';
	}
}

class ProdB1 implements IProdB {
	public func(): string {
		return 'the result of B1';
	}
	public another_func(coll: IProdA): string {
		const result = coll.func();
		return `the result of B1 work with (${result})`;
	}
}

class ProdB2 implements IProdB {
	public func(): string {
		return 'the result of B2';
	}
	public another_func(coll: IProdA): string {
		const result = coll.func();
		return `the result of B2 work with (${result})`;
	}
}

function client_code(fact: IFact) {
	const pA = fact.create_Prod_A();
	const pB = fact.create_Prod_B();

	console.log(pB.func());
	console.log(pB.another_func(pA));
}

console.log();
client_code(new Fact1());
console.log();
client_code(new Fact2());
console.log();
