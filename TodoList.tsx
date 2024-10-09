import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import React, { useState } from 'react';

interface toDo {
  id: number;
  title: string;
  statue: boolean;
}

const TodoList = () => {
  const [title, setTitle] = useState<string>('');
  const [toDo, setToDo] = useState<toDo[]>([]);
  const [editId, setEditId] = useState<number>(0);
  const [editTitle, setEditTitle] = useState<string>('');

  const handleAdd = () => {
    if (title.trim() === '') {
      return;
    }

    const newToDo = {
      id: Date.now(),
      title: title,
      statue: false,
    };

    setToDo(prev => [...prev, newToDo]);

    setTitle('');
  };

  const handleDelete = (deleteId: number) => {
    if (deleteId !== 0) {
      const updateToDo = toDo.filter(item => item.id !== deleteId);
      setToDo(updateToDo);
    }
    return;
  };

  const handleEdit = () => {
    if (editTitle.trim() === '') {
      return;
    } else {
      setToDo(prev =>
        prev.map(item =>
          item.id === editId ? { ...item, title: editTitle } : item,
        ),
      );

      setEditId(0);
      setEditTitle('');
    }
  };

  const handleStartEdit = (editId: number, currentTitle: string) => {
    setEditId(editId);
    setEditTitle(currentTitle);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa', padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' }}>
        To-Do List
      </Text>

      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TextInput
          style={{
            flex: 1,
            borderColor: '#ccc',
            backgroundColor: 'white',
            color: '#333',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderWidth: 1,
            borderRadius: 8,
            fontSize: 16,
          }}
          placeholder="Add a new task"
          value={title}
          onChangeText={setTitle}
        />
        <Pressable
          style={{
            marginLeft: 10,
            backgroundColor: '#28a745',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
            justifyContent: 'center',
          }}
          onPress={handleAdd}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={toDo}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff',
              padding: 15,
              marginBottom: 10,
              borderRadius: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 2,
            }}>
            {item.id === editId ? (
              <TextInput
                style={{
                  flex: 1,
                  borderColor: '#ccc',
                  color: '#333',
                  backgroundColor: 'white',
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 8,
                  fontSize: 16,
                }}
                value={editTitle}
                onChangeText={setEditTitle}
              />
            ) : (
              <Text style={{ color: '#333', fontSize: 18, flex: 1 }}>{item.title}</Text>
            )}

            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              {item.id === editId ? (
                <Pressable
                  style={{
                    backgroundColor: '#007bff',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 8,
                    marginRight: 8,
                  }}
                  onPress={handleEdit}>
                  <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={{
                    backgroundColor: '#ffc107',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 8,
                    marginRight: 8,
                  }}
                  onPress={() => handleStartEdit(item.id, item.title)}>
                  <Text style={{ color: 'white', fontSize: 16 }}>Edit</Text>
                </Pressable>
              )}
              <Pressable
                style={{
                  backgroundColor: '#dc3545',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
                onPress={() => handleDelete(item.id)}>
                <Text style={{ color: 'white', fontSize: 16 }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TodoList;