import Form from "@/classes/RootForm";
import * as console from "node:console";

const form = new Form();
form.setValues({ address: { country: "Belarus" }, name: "Jenesius" });
console.log('----')
form.setValues({address: {index: 1}, age: 24}, {change: true})
console.log('-----')
form.setValues({ address: { city: "Mogilev" } }, { clean: true, change: true });


