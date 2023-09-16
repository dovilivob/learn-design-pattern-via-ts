interface Subject {
	attach(observer: Observer): void;
	detach(observer: Observer): void;
	notify(): void;
}

interface Observer {
	update(subject: Subject): void;
}

class Subject implements Subject {
	public state: number = 0;
	private subscribers: Observer[] = [];

	private get_observer_index(observer: Observer): number {
		return this.subscribers.indexOf(observer);
	}
	public attach(observer: Observer): void {
		if (this.get_observer_index(observer) !== -1) {
			return console.log(`Observer already attached.`);
		}
		this.subscribers.push(observer);
		console.log(`(Attached an observer.)`);
	}
	public detach(observer: Observer): void {
		const index = this.get_observer_index(observer);
		if (index === -1) {
			return console.log(`Observer already detached.`);
		}
		this.subscribers.splice(index, 1);
		console.log(`(Detached an observer.)`);
	}
	public notify(): void {
		for (const client of this.subscribers) {
			client.update(this);
		}
	}
	public make_announce(): void {
		this.state = ~~(Math.random() * 50 + 20);
		console.log(`Making announcement: ${this.state}`);
		this.notify();
	}
}
class ObserverA implements Observer {
	public update(subject: Subject): void {
		const { state } = subject;
		if (state % 3 === 0) console.log(`A: Receiving data!`);
	}
}
class ObserverB implements Observer {
	public update(subject: Subject): void {
		const { state } = subject;
		if (state % 2 === 0) console.log(`B: Receiving data!`);
	}
}

const subject = new Subject();
const A = new ObserverA();
const B = new ObserverB();

subject.attach(A);
subject.attach(A);
subject.detach(B);
subject.attach(B);

subject.make_announce();
subject.make_announce();
subject.make_announce();
subject.detach(B);
subject.make_announce();
subject.make_announce();
