abstract class Component {
	protected parent: Component | null = null;

	public set_parent(parent: Component | null): void {
		if (this.parent) {
			if (this.parent.get_children().includes(this)) this.parent.remove(this);
		}
		this.parent = parent;
	}

	public get_parent(): Component | null {
		return this.parent;
	}

	public get_children(): Component[] {
		return [];
	}

	public add(component: Component): void {}
	public add_all(components: Component[]): void {}
	public remove(component: Component): void {}
	public is_composite(): boolean {
		return false;
	}

	public abstract print_out(): string;
}

class Leaf extends Component {
	public print_out(): string {
		return '📄';
	}
}

class Composite extends Component {
	protected children: Component[] = [];

	public add(component: Component): void {
		this.children.push(component);
		component.set_parent(this);
	}
	public add_all(components: Component[]): void {
		for (const component of components) {
			component.set_parent(this);
			this.children.push(component);
		}
	}

	public get_children(): Component[] {
		return this.children;
	}

	public remove(component: Component): void {
		const index = this.children.indexOf(component);
		this.children.splice(index, 1);
		component.set_parent(null);
	}

	public is_composite(): boolean {
		return true;
	}

	public print_out(): string {
		const result = this.children.map((child) => child.print_out());
		return `📁(${result.join('+')})`;
	}
}

// @ts-ignore
function main(component: Component): void {
	console.log(`Result: ${component.print_out()}`);
}

function main_2(c1: Component, c2: Component): void {
	if (c1.is_composite()) c1.add(c2);
	console.log(`Result: ${c1.print_out()}`);
}

const tree = new Composite();
const branch_1 = new Composite();
const branch_2 = new Composite();
branch_1.add_all([new Leaf(), new Leaf(), new Leaf(), branch_2]);
branch_2.add_all([new Leaf(), branch_1]);
tree.add(branch_2);
main(tree);
