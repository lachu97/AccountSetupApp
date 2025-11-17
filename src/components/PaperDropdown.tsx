import React, { useState } from "react";
import { View } from "react-native";
import { Menu, TextInput, HelperText } from "react-native-paper";

type Item = { label: string; value: string };

interface Props {
  label: string;
  value: string | null;
  items: Item[];
  onChange: (val: string) => void;
  error?: string;
}

export default function PaperDropdown({
                                        label,
                                        value,
                                        items,
                                        onChange,
                                        error,
                                      }: Props) {
  const [visible, setVisible] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0 });

  const open = (e: any) => {
    const { pageX, pageY } = e.nativeEvent;
    setAnchor({ x: pageX, y: pageY });
    setVisible(true);
  };

  const close = () => setVisible(false);

  return (
    <View>
      <TextInput
        label={label}
        value={items.find((i) => i.value === value)?.label || ""}
        mode="outlined"
        editable={false}
        right={<TextInput.Icon icon="menu-down" />}
        error={!!error}
        onPressIn={open}
      />

      <Menu
        visible={visible}
        onDismiss={close}
        anchor={anchor}
        style={{ width: "94%", marginLeft: 12 }}
      >
        {items.map((item) => (
          <Menu.Item
            key={item.value}
            title={item.label}
            onPress={() => {
              close();
              onChange(item.value);
            }}
          />
        ))}
      </Menu>

      {error ? <HelperText type="error">{error}</HelperText> : null}
    </View>
  );
}
