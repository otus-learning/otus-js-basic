export const jestRouterOut = ` | forward onBeforeEnter(/) | forward Render(/) | forward onEnter(/) | forward onLeave(/) | 
async forward onBeforeEnter(/link) | forward Render(/link) | forward onEnter(/link) | forward onLeave(/link) | 
forward onBeforeEnter(/link/link) | forward Render(/link/link) | forward onEnter(/link/link) | forward onLeave(/link/link) | 
forward onBeforeEnter(/) | forward Render(/) | forward onEnter(/) | back onLeave(/) | 
back onBeforeEnter(/link/link) | back Render(/link/link) | back onEnter(/link/link) | forward onLeave(/link/link) | 
forward onBeforeEnter(/) | forward Render(/) | forward onEnter(/)`;
