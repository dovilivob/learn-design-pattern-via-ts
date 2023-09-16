// Factory   --> Fact
// Method    --> Meth
// Product   --> Prod
// Operation --> Op
// Concrete  --> Con
// Abstract  --> Ab

abstract class Creator {
	public abstract fact_meth(): Prod;
	public some_op(): string {
		const prod = this.fact_meth();
		return `the result of (${prod.op()})`;
	}
}

interface Prod {
	op(): string;
}

class Creator1 extends Creator {
	public fact_meth(): Prod {
		return new Prod1();
	}
}

class Prod1 implements Prod {
	public op(): string {
		return 'the result of P1';
	}
}

class Creator2 extends Creator {
	public fact_meth(): Prod {
		return new Prod2();
	}
}

class Prod2 implements Prod {
	public op(): string {
		return 'the result of P2';
	}
}

function main(creator: Creator) {
	console.log(creator.some_op());
}

console.log();

main(new Creator1());
main(new Creator2());

console.log();
