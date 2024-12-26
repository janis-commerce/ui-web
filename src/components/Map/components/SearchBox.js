import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { StandaloneSearchBox as SearchBox } from '@react-google-maps/api';
import Input from 'components/Input';
import styled from '../styles';
import { parseAddressComponents } from '../utils/utils';

const SearchBar = ({ updateMarker }) => {
	const searchBoxRef = useRef(null);

	const onPlacesChanged = async () => {
		const [place] = searchBoxRef.current.getPlaces();

		const {
			geometry: {
				location,
				location: { lat: newLat, lng: newLng }
			}
		} = place;

		const addressData = await parseAddressComponents(location, place.types);
		const { formattedAddress, ...addressComponents } = addressData;

		updateMarker({
			lat: newLat(),
			lng: newLng(),
			addressComponents,
			formattedAddress
		});
	};

	const onLoad = (searchBox) => {
		if (searchBox) searchBoxRef.current = searchBox;
	};

	return (
		<SearchBox onPlacesChanged={onPlacesChanged} onLoad={onLoad}>
			<styled.SearchBoxWrapper>
				<Input placeholder={'search'} hasFloatingLabel={false} />
			</styled.SearchBoxWrapper>
		</SearchBox>
	);
};

SearchBar.propTypes = {
	updateMarker: PropTypes.func,
	translateHelperString: PropTypes.func
};

export default SearchBar;
