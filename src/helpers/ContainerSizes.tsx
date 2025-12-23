import useMedia from '../Hooks/UseMedia';

const sizes = {
  container_xl: '1440px',
  container_l: '1140px',
  container_m: '960px',
  container_s: '540px',
};

const ContainerSizes = () => {
  return {
    xlarge: useMedia(`(min-width: ${sizes.container_xl})`),
    large: useMedia(
      `(max-width: ${sizes.container_xl}) and (min-width: ${sizes.container_l})`
    ),
    medium: useMedia(
      `(max-width: ${sizes.container_l}) and (min-width: ${sizes.container_m})`
    ),
    small: useMedia(`(max-width: ${sizes.container_m})`),
    xsmall: useMedia(`(max-width: ${sizes.container_s})`),
  };
};

export default ContainerSizes;
