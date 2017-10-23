/**
 * @function Router
 * @return {void} null
 */
export default function Router() {
  this.router = [];
  this.push = (a) => { this.router.push(a); };
  this.get = index => this.router[index];
  this.length = () => this.router.length;
}
