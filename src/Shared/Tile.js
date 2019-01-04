import styled from 'styled-components';
import { subtleBoxShadow, lightBlueBackground } from './Styles';

const Tile = styled.div`
    ${subtleBoxShadow}
    ${lightBlueBackground}
    padding: 10px;
`;

export { Tile as default };
