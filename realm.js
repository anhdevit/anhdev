import Realm from 'realm';

const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'int',
    name: 'string',
    status: 'string?',
  },
  primaryKey: '_id',
};

export async function write1() {
  const realm = await Realm.open({
    path: 'myrealm',
    schema: [TaskSchema],
  });

  realm.write(() => {
    task1 = realm.create('Task', {
      _id: 1,
      name: 'go grocery shopping',
      status: 'Open',
    });
    task2 = realm.create('Task', {
      _id: 2,
      name: 'go exercise',
      status: 'Open',
    });
  });
}

export async function read1() {
  const realm = await Realm.open({
    path: 'myrealm',
    schema: [TaskSchema],
  });
  const tasks = realm.objects('Task');
  console.log(`The lists of tasks are: ${tasks.map(task => task.name)}`);

  const openTasks = tasks.filtered("status = 'Open'");
  console.log(
    `The lists of open tasks are: ${openTasks.map(openTask => openTask.name)}`,
  );

  // Sort tasks by name in ascending order
  const tasksByName = tasks.sorted('name');
  console.log(
    `The lists of tasks in alphabetical order are: ${tasksByName.map(
      taskByName => taskByName.name,
    )}`,
  );
  realm.close();
}

export async function modify1() {
  const realm = await Realm.open({
    path: 'myrealm',
    schema: [TaskSchema],
  });

  realm.write(() => {
    task1.status = 'InProgess';
  });
  realm.close();
}

export async function delete1() {
  const realm = await Realm.open({
    path: 'myrealm',
    schema: [TaskSchema],
  });

  realm.write(() => {
    task1.status = 'InProgess';
  });
  realm.close();
}

export async function watchCollection() {}
