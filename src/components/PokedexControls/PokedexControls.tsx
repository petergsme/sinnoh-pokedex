import { Button } from '../Button/Button';
import { Icon } from '../../assets/icons/Icon';
import classNames from 'classnames/bind';
import theme from './pokedexControls.module.scss';

const cx = classNames.bind(theme);

interface PokedexControlsProps {
  view: string;
  setView: (view: 'grid' | 'list') => void;
  show: string;
  setShow: (view: 'all' | 'favorites') => void;
  onPageChange: (page: number) => void;
}

export const PokedexControls = ({ view, setView, show, setShow, onPageChange }: PokedexControlsProps) => {
  return (
    <section className={cx('controls')}>
      <div>
        <p className={cx('paragraph-s-medium')}>View:</p>
        <Button onClick={() => setView('grid')} toggle={view === 'grid'} name="View as grid">
          Grid
        </Button>
        <Button onClick={() => setView('list')} toggle={view === 'list'} name="View as list">
          List
        </Button>
      </div>

      <div>
        <Button onClick={() => setShow('all')} toggle={show === 'all'} name="Show all Pokémon">
          All
        </Button>
        <Button
          onClick={() => {
            setShow('favorites');
            onPageChange(1);
          }}
          toggle={show === 'favorites'}
          name="Show favorite Pokémon"
        >
          <Icon icon="Heart" />
        </Button>
      </div>
    </section>
  );
};
