import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, TouchableOpacity, Button, CheckBox } from 'react-native';
import React, { useState } from 'react';
//used chatgpt to help with assignment

export default function App() {
  // Set of default tasks displayed based on an array stored as a state of the main component
  const [tasks, setTasks] = useState([
    {
      key: "1",
      description: "Task Title 1",
      completed: false
    },
    {
      key: "2",
      description: "Task Title 2",
      completed: false
    },
    {
      key: "3",
      description: "Task Title 3",
      completed: true
    },
    {
      key: "4",
      description: "Task Title 4",
      completed: true
    }
  ]);

  const [newTask, setNewTask] = useState('');

  //adds a new task to the tasks array with a key
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks(prevTasks => [
        ...prevTasks,
        {
          key: String(prevTasks.length + 1),
          description: newTask,
          completed: false
        }
      ]);
      setNewTask('');
    }
  };

  //renders each item in FlatList
  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskItem}>
        <CheckBox
          value={item.completed}
          onValueChange={() => {
            setTasks(prevTasks =>
              prevTasks.map(task =>
                task.key === item.key ? { ...task, completed: !task.completed } : task
              )
            );
          }}
        />
        <Text style={item.completed ? styles.completedText : styles.taskText}>
          {item.description}
        </Text>
      </View>
    );
  };

  //renders UI
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.appTitle}>ToDooz</Text>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setNewTask}
            value={newTask}
            placeholder="Enter a New Task"
          />
          <TouchableOpacity style={styles.button} onPress={handleAddTask}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7EBF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    flex: 1,
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginTop: 10,
    height: 50,
    flex: 1,
    margin: 5,
    borderWidth: 3,
    padding: 15,
  },
  button: {
    backgroundColor: '#FF6464',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  taskItem: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskText: {
    marginLeft: 10,
  },
  completedText: {
    marginLeft: 10,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#FF6464',
  },
});
