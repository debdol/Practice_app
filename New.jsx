import React, { useState, useEffect } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

const useInitialURL = () => {
    const [url, setUrl] = useState(null);
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
        const getUrlAsync = async () => {
            // Get the deep link used to open the app
            const initialUrl = await Linking.getInitialURL();

            // The setTimeout is just for testing purpose
            setInterval(() => {
                setUrl(initialUrl);
                // console.log(initialUrl);
                setProcessing(false);
            }, 5000);
        };
        getUrlAsync();
    }, []);

    return { url, processing };
};

const New = () => {
    const { url: initialUrl, processing } = useInitialURL();

    return (
        <View style={styles.container}>
            <Text>
                {processing
                    ? 'Processing the initial url from a deep link'
                    : `The deep link is: ${initialUrl || 'None'}`}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default New;