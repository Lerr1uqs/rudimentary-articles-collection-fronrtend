
import React, { useState } from 'react';
import { connect} from 'react-redux';
import { ArticlesState } from '../components/article';
import { AppState } from '../components/root';
import { TextField, PrimaryButton, Stack } from '@fluentui/react';
import { createFavourite, deleteFavourite } from '../components/favourite';
import { Favourite } from '../components/favourite';

import { IconButton, Text } from '@fluentui/react';

interface FavItemProps {
  favourite: Favourite;
  deleteFavourite: (fid: number) => void;
}

const FavItem: React.FC<FavItemProps> = ({ favourite, deleteFavourite }) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Stack tokens={{ childrenGap: 10 }} styles={{ root: { marginBottom: 10 } }}>

      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
        <Text variant="large">{favourite.title}</Text>
        <IconButton iconProps={{ iconName: isOpen ? 'ChevronDown' : 'ChevronRight' }} onClick={toggleOpen} />
        <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => deleteFavourite(favourite.fid)} />
      </Stack>
      
      {isOpen && (
        <Stack styles={{ root: { paddingLeft: 20 } }}>
          {favourite.articles.map(article => (
            <Text key={article.id}>{article.title}</Text>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

interface FavoritesProps {
    favs: {[fid: number]: Favourite},
    createFavourite: (title: string) => void,
    deleteFavourite: (fid: number) => void
}

const Favourites: React.FC<FavoritesProps> = ({ favs, createFavourite, deleteFavourite }) => {
    const [newTitle, setNewTitle] = useState('');

    const handleCreateFavourite = () => {
        createFavourite(newTitle);
        setNewTitle(''); // 清空输入框
    };

    return (
        <>
            <Stack horizontal tokens={{ childrenGap: 10 }} style={{ marginBottom: 20 }} verticalAlign="end">
                <TextField 
                  label="New Favourite Title" 
                  value={newTitle} 
                  onChange={(_, newValue) => setNewTitle(newValue || '')} 
                />
                <PrimaryButton onClick={handleCreateFavourite}>Create Favourite</PrimaryButton>
            </Stack>
            <Stack tokens={{ childrenGap: 20 }}>
                {Object.values(favs).map(favourite => (
                    <FavItem key={favourite.fid} favourite={favourite} deleteFavourite={deleteFavourite} />
                ))}
            </Stack>
        </>
    );
};

const mapStateToProps = (state: AppState) => ({
    // count: state.count,
    favs: state.favourite.favs
});
  
// Mapping Redux actions to component props
const mapDispatchToProps = {
    // addArticle: (title, text) => dispatch(), // Shortcut notation for `increment: () => dispatch(increment())`
    createFavourite: (title: string) => createFavourite(title),
    deleteFavourite: (fid: number) => deleteFavourite(fid)
};

const FavContainer = connect(mapStateToProps, mapDispatchToProps)(Favourites);

export default FavContainer;
