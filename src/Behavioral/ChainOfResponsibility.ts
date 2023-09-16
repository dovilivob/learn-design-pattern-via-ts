interface Handler {
	set_next(handler: Handler): Handler;
	handle(req: string): string | null;
}

abstract class Handler implements Handler {
	private next!: Handler;

	public set_next(handler: Handler): Handler {
		this.next = handler;
		return handler;
	}

	public handle(req: string): string | null {
		if (this.next) return this.next.handle(req);
		return null;
	}
}

class Monke extends Handler {
	public handle(req: string): string | null {
		if (req === '🍌') return `🦍: "Thx bruh. I'ma eat that ${req}."`;
		return super.handle(req);
	}
}
class Snake extends Handler {
	public handle(req: string): string | null {
		if (req === '🐁') return `🐍: "Ah... I'ma eat that ${req}."`;
		return super.handle(req);
	}
}
class Cat extends Handler {
	public handle(req: string): string | null {
		if (req === '🪳') return `🐈: "Meow meow. I'ma fuck that ${req}."`;
		return super.handle(req);
	}
}

// @ts-ignore
function main(handler: Handler) {
	console.log();
	const foods = ['🍌', '🥩', '🪳', '🍎', '🐁'];
	for (const food of foods) {
		console.log(`😀: "Who wants this ${food}?"`);
		const result = handler.handle(food);
		if (result) console.log(result);
		else console.log('(Wow, nobody likes that garbage...)');
		console.log();
	}
}

const monke = new Monke();
const snake = new Snake();
const cat = new Cat();

monke.set_next(snake).set_next(cat);

console.log('🦍 --> 🐍 --> 🐈');
main(monke);
console.log('🐍 --> 🐈');
main(snake);
console.log('🐈');
main(cat);
