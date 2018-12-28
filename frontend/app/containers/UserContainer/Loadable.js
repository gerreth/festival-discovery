/**
 * Asynchronously loads the component for UserContainer
 */
import loadable from 'loadable-components';

export default loadable(() => import('./index'));
