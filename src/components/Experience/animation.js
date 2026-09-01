export const reveal = {
    hidden: {
        opacity: 0,
        clipPath: "inset(0 0 100% 0)"
    },
    visible: (i = 0) => ({
        opacity: 1,
        clipPath: "inset(0 0 0% 0)",
        transition: { duration: 0.5, delay: 0.08 * i, ease: [0.76, 0, 0.24, 1] }
    })
}
