import Avatar from 'components/Avatar';
import React from 'react';

const AvatarList = ({ userList, hasExtraCount, extraCountActualIndex, showFull }) => {
	return userList.map(({ firstname, lastname, url, id }, index) => {
		if (hasExtraCount && index < extraCountActualIndex) return null;
		return (
			<Avatar
				key={id}
				firstname={firstname}
				lastname={lastname}
				url={url}
				size={showFull ? 'large' : 'small'}
			/>
		);
	});
};

export default AvatarList;
