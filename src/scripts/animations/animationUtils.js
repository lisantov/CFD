// ИНТЕРФЕЙС ДЛЯ trigger
// [
//   {
//       trigger: HTMLElement,
//       class: string,
//       invert: boolean
//   },
//   ...
// ]
export const useObserverForAnimation = (
    target,
    triggers
) => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            triggers.forEach(t => {
                if (entry.isIntersecting && !t.invert && entry.target === t.trigger)
                    target.classList.add(t.class);
                else if (!entry.isIntersecting && t.invert && entry.target === t.trigger)
                    target.classList.add(t.class);
                else
                    target.classList.remove(t.class);
            })
        });
    });
    triggers.forEach(t =>
        observer.observe(t.trigger)
    );
}