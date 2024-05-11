import { useState } from 'react';
import { Box, Button, Container, Input, List, ListItem, IconButton, Text, VStack, useToast } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const TaskInput = ({ input, setInput, handleAddTask }) => (
  <Box display="flex" width="100%">
    <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
    <Button onClick={handleAddTask} ml={2} colorScheme="green">Add</Button>
  </Box>
);

const TaskList = ({ tasks, editIndex, editText, setEditText, handleSaveEdit, handleEditTask, handleDeleteTask }) => (
  <List width="100%">
    {tasks.map((task, index) => (
      <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md">
        {editIndex === index ? (
          <Input value={editText} onChange={(e) => setEditText(e.target.value)} />
        ) : (
          <Text>{task}</Text>
        )}
        <Box>
          {editIndex === index ? (
            <IconButton icon={<FaSave />} onClick={handleSaveEdit} aria-label="Save edit" />
          ) : (
            <IconButton icon={<FaEdit />} onClick={() => handleEditTask(index)} aria-label="Edit task" ml={2} />
          )}
          <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(index)} aria-label="Delete task" ml={2} />
        </Box>
      </ListItem>
    ))}
  </List>
);

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState('');
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'Cannot add empty task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, input]);
    setInput('');
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditText(tasks[index]);
  };

  const handleSaveEdit = () => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === editIndex) {
        return editText;
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditIndex(-1);
    setEditText('');
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
        <TaskInput input={input} setInput={setInput} handleAddTask={handleAddTask} />
        <TaskList tasks={tasks} editIndex={editIndex} editText={editText} setEditText={setEditText} handleSaveEdit={handleSaveEdit} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} />
      </VStack>
    </Container>
  );
};

export default TodoApp;