import { useShallow } from 'zustand/react/shallow';

import { WhiteCard } from '../../../components';
import { useBearStore } from '../../../stores';

export function BearsDisplay() {
  const bears = useBearStore(useShallow((state) => state.bears));
  const doNothing = useBearStore((state) => state.doNothing);

  return (
    <WhiteCard>
      <h1>Osos</h1>
      <button onClick={doNothing}>Do Nothing</button>
      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
}
