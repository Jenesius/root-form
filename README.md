# ФИЧИ

1. Возможность контроля ввода:
```ts

const form = new Form();
form.validation('user.age', (v) => {
	if (typeof v !== 'number') return;
	return (v < 18) ? 18 : v;
})
```

Такой подход поможет в будущем реализовать validationSystem:

```ts

const system = new ValidationSystem();
system.add('user.age', [ValiddationSystem.isNumber, ValidationSystem.minNumber(18)])

const form = new Form({
    validationSystem: system
});
```

Но это ещё нужно протестировать и посмотреть, как это реализовано у других.
